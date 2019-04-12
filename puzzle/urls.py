from django.conf.urls import url
from django.urls import path
from django.conf import settings

from puzzle.views import(
        #addresses,
        photos,
        index,
        puzzle_game,
        growing_mode,
        family_mode,
        #zooListView
        #PhotoView
        pickAnimal
        )

app_name = 'puzzle'
urlpatterns = [
    path('', index, name='index'),
    
    #url(r'^addresses/$',addresses),
    #url(r'^photos/$',photos),
    #path('<int:id>/',PhotoView.as_view(template_name='puzzle/photo.html'),name='photo-detail'),
	path('puzzle_game/<int:specieId>/', puzzle_game, name='puzzle_game'),    
	path('growing_mode/',growing_mode, name='growing_mode'),
	path('family_mode/', family_mode, name='family_mode'),
   path('pickAnimal/',pickAnimal,name='pickAnimal'),
   # path('',zooListView.as_view(),name='zoo-list')
   #path('photos',PhotoView.as_view(template_name='puzzle/photo.html'),name='photo-list')
        
    #path('puzzle_game/', puzzle_game, name='puzzle_game'),
   
]



