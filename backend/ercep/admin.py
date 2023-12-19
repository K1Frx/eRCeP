from django.contrib import admin
from ercep.models import Worker, Employer, Contract, Worktime, AbsenceType, Absence

# Register your models here.

admin.site.site_header = "Ercep"
admin.site.register(Worker)
admin.site.register(Employer)
admin.site.register(Contract)
admin.site.register(Worktime)
admin.site.register(AbsenceType)
admin.site.register(Absence)
