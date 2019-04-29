from django.contrib import admin
from .models import Puzzle,Address,User,Photo,level,Specie,Zoo,Food,Tool
# Register your models here.
@admin.register(Puzzle)
class PuzzleAdmin(admin.ModelAdmin):
    list_display = ['puzzle_id','level']
    
@admin.register(level)
class LevelAdmin(admin.ModelAdmin):
    list_display = ['level_id','level_desc','level_score']
    
    list_editable = ['level_score']
    
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['user_id','username','password','user_score','postcode']
    
@admin.register(Photo)    
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['photo_id','image']
    search_fields= ['photo_id']
    
@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['address','postcode','suburb','street']
    
@admin.register(Specie)    
class SpecieAdmin(admin.ModelAdmin):
    list_display = ['specie_id','specie_name','specie_desc','easy','medium','diff']
    
@admin.register(Zoo)    
class ZooAdmin(admin.ModelAdmin):
    list_display = ['zoo_id']
    
@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ['foodName','food_img','food_score']

@admin.register(Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ['toolName','tool_img','tool_score']
#admin.site.register(Puzzle,PuzzleAdmin)
#admin.site.register(Address,AddressAdmin)
#admin.site.register(User,UserAdmin)
#admin.site.register(Photo,PhotoAdmin)
#admin.site.register(level,LevelAdmin)n
#admin.site.register(Specie,SpecieAdmin)

