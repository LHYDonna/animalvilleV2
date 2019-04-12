from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.views import generic, View
from .models import Address,Photo,Zoo,Specie,Puzzle
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView
from django.core import serializers
import json


class Puzzle(View):
    template_name = 'puzzle/puzzle.html'
    def get(self,request,id=None, *args, **kwargs):
        context = {}
        if id is not None:
            puzzleList = Puzzle.objects.get(fk=id)
            context['puzzleImage'] = puzzleList
        return render(request,self.template_name,context)

def photos(request):
    photoList = Photo.objects.all()
    return render(request,'puzzle/photo.html',{"photos":photoList})
	
def index(request):
    address_list = Address.objects.all()
    context = {'address_list': address_list,}
    return render(request, 'puzzle/index.html', context)

def puzzle_game(request,specieId):
    photoList = Photo.objects.filter(specie=specieId)
    # pass specie description
    specie = Specie.objects.get(pk=specieId)
    context = {
            "imageList" : photoList,
            "specie_desc" : specie.specie_desc
            }
    return render(request,'puzzle/puzzle.html',context)  
	
def growing_mode(request):
    return render(request, 'puzzle/grow.html')

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
    return render(request,'puzzle/pickAnimal.html',context) 
    


