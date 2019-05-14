
from django.urls import path,include 

from puzzle.views import(   
        
        index,
        puzzle_game,       
        family_mode,
        #zooListView
        #PhotoView
        pickAnimal,
        animalGrow,
        animal,        
        score,     
        signup,
        modes,
        info,
        header,
        )

app_name = 'puzzle'
urlpatterns = [
    path('', index, name='index'),   
	path('puzzle_game/<int:specieId>/', puzzle_game, name='puzzle_game'),    
	path('animalGrow/',animalGrow, name='animalGrow'),
	path('family_mode/', family_mode, name='family_mode'),
   path('pickAnimal/',pickAnimal,name='pickAnimal'),
   path('animal/<int:specieId>/',animal,name='animal'),   
   path('score/',score,name='score'),
   path('signup/', signup, name='signup'),    
   path('modes/',modes,name='modes'),
   path('info/',info,name='info'),
    path('header/',header,name='header'),
   
        
 
   
]



