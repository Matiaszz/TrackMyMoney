from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from transactions.models import Transaction

from transactions.serializers import (
    GroupSerializer, UserSerializer, TransactionSerializer
)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()  # Declaração explícita
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def get_queryset(self):
    #     return Transaction.objects.filter(user=self.request.user)
