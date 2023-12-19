from django.db import models
from django.core.validators import RegexValidator

class Worker(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE, unique=True, related_name='worker', null=True)
    first_name = models.CharField(max_length=50, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=False, blank=False)
    email = models.EmailField(null=True, blank=True)
    phone_number = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        validators=[
            RegexValidator(
                regex=r'^\+?1?\d{9,15}$',
                message='Phone number must be entered in the format: +999999999. Up to 15 digits allowed.'
            )
        ]
    )
    birth_date = models.DateField(null=False, blank=False)
    
    def __str__(self):
        return self.first_name + ' ' + self.last_name
    

class Employer(models.Model):
    name = models.CharField(max_length=50, null=False, unique=True, blank=False)
    nip = models.CharField(max_length=10, null=False, unique=True, blank=False)
    adress = models.CharField(max_length=100, null=True, blank=True)
    
    def __str__(self):
        return self.name + ' ' + self.nip
    
class Contract(models.Model):
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE, related_name='contracts', null=False)
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE, related_name='contracts', null=False)
    date_start = models.DateField(null=False, blank=False)
    date_end = models.DateField(null=True, blank=True)
    
class Worktime(models.Model):
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE, related_name='worktimes', null=False)
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='worktimes', null=False)
    time_in = models.DateTimeField(null=False, blank=False)
    time_out = models.DateTimeField(null=False, blank=False)
    sum_min = models.IntegerField(null=False, blank=False)
    comment = models.CharField(max_length=500, null=True, blank=True)
    
    def save(self, *args, **kwargs):
        self.time_in = self.time_in.replace(second=0, microsecond=0)
        self.time_out = self.time_out.replace(second=0, microsecond=0)

        time_diff = self.time_out - self.time_in
        self.sum_min = time_diff.total_seconds() / 60

        super().save(*args, **kwargs)
        
class AbsenceType(models.Model):
    name = models.CharField(max_length=50, null=False, unique=True, blank=False)
    comment = models.CharField(max_length=500, null=True, blank=True)

class Absence(models.Model):
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE, related_name='absences', null=False)
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='absences', null=False)
    date = models.DateField(null=False, blank=False)
    absence_type = models.ForeignKey(AbsenceType, on_delete=models.CASCADE, related_name='absences', null=False)
    comment = models.CharField(max_length=500, null=True, blank=True)