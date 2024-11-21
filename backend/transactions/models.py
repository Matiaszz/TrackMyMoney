from django.db import models
from datetime import date


class Transaction(models.Model):
    class TransactionType(models.TextChoices):
        ESSENTIAL_EXPENSE = 'EE', 'Gastos Essenciais'
        INVESTMENT = 'IN', 'Investimentos'
        LEISURE = 'LE', 'Lazer'
        HEALTH = 'HE', 'Saúde'
        EDUCATION = 'ED', 'Educação'
        OTHER = 'OT', 'Outros'

    title = models.CharField(max_length=50)
    transaction_type = models.CharField(
        max_length=2,
        choices=TransactionType.choices,
        default=TransactionType.OTHER,
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    # Corrigido para chamar a função date.today()
    date = models.DateField(default=date.today)

    def __str__(self) -> str:
        return f'{self.title} ({self.get_transaction_type_display()})'
