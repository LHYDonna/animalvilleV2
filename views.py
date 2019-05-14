from django.http import HttpResponse
from django.shortcuts import render,redirect
from django.views import generic, View
from .models import Address,Photo,Zoo,Specie,Puzzle,User,Food
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.core import serializers
import json
from django.template import RequestContext, loader
from django.views.decorators.csrf import csrf_protect
from django.db.models import Q
from django.contrib.auth import logout,login,authenticate
from puzzle.forms import SignUpForm

def modes(request):  
    address_list = Address.objects.all()
    context = {'address_list': address_list,}
    return render(request,'puzzle/modeSelection.html',context)
	
def index(request):    
    return render(request, 'puzzle/index.html')

def puzzle_game(request,specieId):
    # = where specie=specieid and photo_desc like 'puzzle%'
    photoList = Photo.objects.filter(Q(specie=specieId),Q(photo_desc__startswith='puzzle'))
    # pass specie description
    specie = Specie.objects.get(pk=specieId)
    context = {
            "imageList" : photoList,
            "specie_desc" : specie.specie_desc,
            "easy":specie.easy,
            "medium":specie.medium,
            "diff":specie.diff,
            "specie_id":specieId
            }           
    
    return render(request,'puzzle/puzzle.html',context)  


def family_mode(request):
    zooList = Zoo.objects.all()
    return render(request,'puzzle/family.html',{
            'zooList':zooList           
            })    
    #display puzzle photo

def pickAnimal(request):
    specieList = Specie.objects.all()
    imageList = Photo.objects.all()    
    
    context = {
            "specieList" : specieList ,
            "imageList": imageList
            }
    return render(request,'puzzle/puzzleselect.html',context) 
    

def animalGrow(request):
    unlock = True
    context ={
            "unlock": unlock,
            }
    return render(request, 'puzzle/animalForGrow.html',context)

def animal(request,specieId):
    template = 'puzzle/grow.html'
    foodlist = Food.objects.values('food_img')
    specie = Specie.objects.get(pk=specieId)
    img = Photo.objects.filter(Q(specie=specieId),Q(photo_desc__startswith='grow'))
    context = {
            "specieId":specieId,
            "specie":specie,
             "specieimg" : img,
             "food" : foodlist             
            }
    return render(request,template,context)


@csrf_protect
def score(request):
    from django.http import JsonResponse
    if request.method =='POST' and request.is_ajax():
        try:
            username = request.POST['username']
            user = User.objects.get(username=username)
            user.user_score = request.POST['score']
            user.save()
            return JsonResponse({'status':'Success', 'msg': 'save successfully'})
        except User.DoesNotExist:
            return JsonResponse({'status':'Fail', 'msg': 'Object does not exist'})
    else:
         return JsonResponse({'status':'Fail', 'msg':'Not a valid request'})
def signup(request):
    form=SignUpForm()
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password')
            postcode = form.cleaned_data.get('postcode')
            user = authenticate(username=username, password=raw_password,postcode=postcode)          
            
    else:
        print(form.errors)
    return render(request, 'registration/signup.html', {'register_form': form})

def info(request):
    specieList = Specie.objects.all()
    context={
        'specieList':specieList,
        }
    return render(request,'puzzle/info.html',context)

def header(request):
    specieList = Specie.objects.all()
    context={
        'specieList':specieList,
        }
    return render(request,'puzzle/header.html',context)
    