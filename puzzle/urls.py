
from django.urls import path,include 

from puzzle.views import(   
        
        index,
        puzzle_game,
        growing_mode,
        family_mode,
        #zooListView
        #PhotoView
        pickAnimal,
        animalGrow,
        animal,        
        score,     
        signup
        )

app_name = 'puzzle'
urlpatterns = [
    path('', index, name='index'),
    
    #url(r'^addresses/$',addresses),
    #url(r'^photos/$',photos),
    #path('<int:id>/',PhotoView.as_view(template_name='puzzle/photo.html'),name='photo-detail'),
	path('puzzle_game/<int:specieId>/', puzzle_game, name='puzzle_game'),    
	path('animalGrow/',animalGrow, name='animalGrow'),
	path('family_mode/', family_mode, name='family_mode'),
   path('pickAnimal/',pickAnimal,name='pickAnimal'),
   path('animal/<int:specieId>/',animal,name='animal'),
   
   path('score/',score,name='score'),
   path('signup/', signup, name='signup'),
    
   # path('',zooListView.as_view(),name='zoo-list')
   #path('photos',PhotoView.as_view(template_name='puzzle/photo.html'),name='photo-list')
        
    #path('puzzle_game/', puzzle_game, name='puzzle_game'),
   
]



