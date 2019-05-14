from django.db import models
from django.urls import reverse
from django.contrib.auth.models import AbstractUser
# Create your models here.

class level(models.Model):
    level_id = models.IntegerField(primary_key=True)
    level_desc = models.CharField(max_length=10)
    level_score = models.IntegerField()
    def __str__(self):
        result = str(self.level_id) + '\n' + self.level_desc + '\n' + str(self.level_score)
        return result
    
class Address(models.Model):
    address= models.IntegerField(db_index=True)
    city = models.CharField(max_length=20,null=True)
    suburb = models.CharField(max_length=20,null=True)
    postcode = models.CharField(max_length=4,null=True)
    street = models.CharField(max_length=50,null=True)    
    def __str__(self):
        result = str(self.address) + '\n' + self.city + '\n' + self.suburb + '\n' + str(self.postcode) + '\n' + self.street
        return result

class User(AbstractUser):    
    user_id = models.IntegerField(primary_key=True,db_index=True)
    username =models.CharField(max_length=15,null=True,unique=True)  
    password = models.CharField(max_length=15,null=True,unique=True)
    postcode = models.CharField(max_length=4,null=True)      
    user_score = models.IntegerField(default=100)
    
    USERNAME_FIELD = 'username'
    PASSWORD_FIELD = 'password'
    class Meta(AbstractUser.Meta):
        pass
    
class Zoo(models.Model):
    zoo_id = models.IntegerField(primary_key=True,db_index=True)    
    zoo_logo = models.ImageField(upload_to='puzzle',blank=True,null=True)
    zoo_name = models.CharField(max_length=200,null=True)
    zoo_city = models.CharField(max_length=20,null=True)
    zoo_suburb = models.CharField(max_length=20,null=True)
    zoo_post = models.IntegerField()
    zoo_street = models.CharField(max_length=50,null=True)
    zoo_open = models.DateTimeField('zoo open time')
    zoo_close = models.DateTimeField('zoo close time')
    zoo_address = models.CharField(max_length=250,null=True)
    def __str__(self):
        return self.zoo_name


    
class Specie(models.Model):    
    specie_id = models.IntegerField(primary_key=True,db_index=True)
    specie_name = models.CharField(max_length=300,null=True,blank=True)
    specie_desc = models.CharField(max_length=300,null=True,blank=True,default='')
    easy = models.CharField(max_length=1000,null=True,blank=True,default='')
    medium = models.ImageField(upload_to='puzzle/',blank=True,null=True)
    diff = models.CharField(max_length=1000,null=True,blank=True,default='')
    map = models.CharField(max_length=1000,null=True,blank=True)
    def __str__(self):
        return str(self.specie_id) 
    
class Photo(models.Model):
    photo_id = models.IntegerField(primary_key=True,db_index=True)
    photo_desc = models.CharField(max_length=300,null=True)    
    image = models.ImageField(upload_to='puzzle/',blank=True,null=True)
    specie = models.ForeignKey(Specie,on_delete=models.CASCADE,blank=True,null=True)
    def __str__(self):
        return self.photo_desc
    def get_absolute_url(self):
        #return reverse("photos",kwargs={"id":self.photo_id})#f"/photos/{self.photo_id}/"
        return "/photos/{self.photo_id}"
    
class Food(models.Model):
    foodName = models.CharField(max_length=20,null=True)
    food_img = models.ImageField(upload_to='puzzle/',blank=True,null=True)
    food_score =models.IntegerField(default=10)
    specie = models.ForeignKey(Specie,on_delete=models.CASCADE,blank=True,null=True)

class Puzzle(models.Model):
    puzzle_id = models.IntegerField(primary_key=True,db_index=True)
    picture = models.ForeignKey(Photo,on_delete=models.CASCADE)
    level = models.ForeignKey(level,on_delete=models.CASCADE)
    specie = models.ForeignKey(Specie,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    startTime = models.DateTimeField('time start play')
    endTime = models.DateTimeField('time finish play')
    
class Tool(models.Model):
    toolName = models.CharField(max_length=20,null=True)
    tool_img = models.ImageField(upload_to='puzzle/',blank=True,null=True)
    tool_score = models.IntegerField(default=20)

