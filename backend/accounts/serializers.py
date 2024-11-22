from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

# Serializer para o modelo de usuário (para exibição de dados do usuário)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


# Serializer para registro de usuário
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        # A senha não deve ser retornada após o registro
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Cria o usuário com a senha hashificada automaticamente
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            # A senha será automaticamente hashificada
            password=validated_data['password']
        )
        return user


# Serializer para login de usuário (autenticação)
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        from django.contrib.auth import authenticate
        user = authenticate(**data)
        if user:
            return user  # Retorna o usuário autenticado
        # Caso as credenciais estejam erradas
        raise serializers.ValidationError("Credenciais inválidas")


# Serializer para o token de acesso e refresh (para login)
class TokenSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField()
