from django import forms
from django.contrib.auth.forms import UserCreationForm
from puzzle.views import User


class SignUpForm(UserCreationForm):    
    postcode = forms.CharField(max_length=4,required=True,error_messages={'required':'postcode cannot be blank'})
    
    class Meta:
        model = User
        fields = ('username','postcode' )

