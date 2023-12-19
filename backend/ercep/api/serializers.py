from rest_framework import serializers
from ercep.models import Worker, Employer, Contract, Absence, AbsenceType, Worktime

# Generic serializers
class GenericPaginationResponseSerializer(serializers.Serializer):
    page = serializers.IntegerField()
    total = serializers.IntegerField()
    per_page = serializers.IntegerField()
    num_pages = serializers.IntegerField()
    offset = serializers.IntegerField()
    
class GenericPaginationRequestSerializer(serializers.Serializer):
    page = serializers.IntegerField(required=False)
    per_page = serializers.IntegerField(required=False)
    
# Worker serializers
class WorkerGetRequestSerializer(GenericPaginationRequestSerializer):
    first_name = serializers.ListField(child=serializers.CharField(max_length=50), required=False)
    last_name = serializers.ListField(child=serializers.CharField(max_length=50), required=False)
    email = serializers.ListField(child=serializers.EmailField(), required=False)
    phone_number = serializers.ListField(child=serializers.CharField(max_length=20), required=False)
    birth_date = serializers.ListField(child=serializers.DateField(), required=False)
    
class WorkerPostRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = '__all__'
        
class WorkerPatchRequestSerializer(WorkerPostRequestSerializer):
    pass

class WorkerResponseSerializer(GenericPaginationResponseSerializer):
    items = WorkerPostRequestSerializer(many=True)

# Employer serializers
class EmployerGetRequestSerializer(GenericPaginationRequestSerializer):
    name = serializers.ListField(child=serializers.CharField(max_length=50), required=False)
    nip = serializers.ListField(child=serializers.CharField(max_length=10), required=False)
    adress = serializers.ListField(child=serializers.CharField(max_length=100), required=False)

class EmployerPostRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'

class EmployerPatchRequestSerializer(EmployerPostRequestSerializer):
    pass

class EmployerResponseSerializer(GenericPaginationResponseSerializer):
    items = EmployerPostRequestSerializer(many=True)
    
# Contract serializers
class ContractGetRequestSerializer(GenericPaginationRequestSerializer):
    employer = serializers.ListField(child=serializers.IntegerField(), required=False)
    worker = serializers.ListField(child=serializers.IntegerField(), required=False)
    date_start = serializers.ListField(child=serializers.DateField(), required=False)
    date_end = serializers.ListField(child=serializers.DateField(), required=False)

class ContractPostRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'

class ContractPatchRequestSerializer(ContractPostRequestSerializer):
    pass

class ContractResponseSerializer(GenericPaginationResponseSerializer):
    items = ContractPostRequestSerializer(many=True)

# Absence serializers
class AbsenceGetRequestSerializer(GenericPaginationRequestSerializer):
    worker = serializers.ListField(child=serializers.IntegerField(), required=False)
    contract = serializers.ListField(child=serializers.IntegerField(), required=False)
    date = serializers.ListField(child=serializers.DateField(), required=False)
    absence_type = serializers.ListField(child=serializers.IntegerField(), required=False)
    comment = serializers.ListField(child=serializers.CharField(max_length=500), required=False)
    
class AbsencePostRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Absence
        fields = '__all__'
        
class AbsencePatchRequestSerializer(AbsencePostRequestSerializer):
    pass

class AbsenceResponseSerializer(GenericPaginationResponseSerializer):
    items = AbsencePostRequestSerializer(many=True)

# AbsenceType serializers
class AbsenceTypeGetRequestSerializer(GenericPaginationRequestSerializer):
    name = serializers.ListField(child=serializers.CharField(max_length=50), required=False)
    comment = serializers.ListField(child=serializers.CharField(max_length=500), required=False)
    
class AbsenceTypePostRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AbsenceType
        fields = '__all__'
        
class AbsenceTypePatchRequestSerializer(AbsenceTypePostRequestSerializer):
    pass

class AbsenceTypeResponseSerializer(GenericPaginationResponseSerializer):
    items = AbsenceTypePostRequestSerializer(many=True)

# Worktime serializers
class WorktimeGetRequestSerializer(GenericPaginationRequestSerializer):
    worker = serializers.ListField(child=serializers.IntegerField(), required=False)
    contract = serializers.ListField(child=serializers.IntegerField(), required=False)
    time_in = serializers.ListField(child=serializers.DateTimeField(), required=False)
    time_out = serializers.ListField(child=serializers.DateTimeField(), required=False)
    sum_min = serializers.ListField(child=serializers.IntegerField(), required=False)
    comment = serializers.ListField(child=serializers.CharField(max_length=500), required=False)
    
class WorktimePostRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worktime
        fields = '__all__'
        
class WorktimePatchRequestSerializer(WorktimePostRequestSerializer):
    pass

class WorktimeResponseSerializer(GenericPaginationResponseSerializer):
    items = WorktimePostRequestSerializer(many=True)