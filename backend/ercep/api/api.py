from ercep.api.genericapi import GenericCRUDAPIView
from ercep.models import Worker, Employer, Contract, Absence, AbsenceType, Worktime
from ercep.api.serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

class CustomAuthToken(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return Response({'token': response.data['access']})
    
class WorkerAPIView(GenericCRUDAPIView):
    model = Worker
    
    request_serializer_get = WorkerGetRequestSerializer
    request_serializer_post = WorkerPostRequestSerializer
    request_serializer_patch = WorkerPatchRequestSerializer
    
    response_serializer_get = WorkerResponseSerializer
    response_serializer_post = WorkerResponseSerializer
    response_serializer_patch = WorkerResponseSerializer
    
class EmployerAPIView(GenericCRUDAPIView):
    model = Employer
    
    request_serializer_get = EmployerGetRequestSerializer
    request_serializer_post = EmployerPostRequestSerializer
    request_serializer_patch = EmployerPatchRequestSerializer
    
    response_serializer_get = EmployerResponseSerializer
    response_serializer_post = EmployerResponseSerializer
    response_serializer_patch = EmployerResponseSerializer

class ContractAPIView(GenericCRUDAPIView):
    model = Contract
    
    request_serializer_get = ContractGetRequestSerializer
    request_serializer_post = ContractPostRequestSerializer
    request_serializer_patch = ContractPatchRequestSerializer
    
    response_serializer_get = ContractResponseSerializer
    response_serializer_post = ContractResponseSerializer
    response_serializer_patch = ContractResponseSerializer

class AbsenceAPIView(GenericCRUDAPIView):
    model = Absence
    
    request_serializer_get = AbsenceGetRequestSerializer
    request_serializer_post = AbsencePostRequestSerializer
    request_serializer_patch = AbsencePatchRequestSerializer
    
    response_serializer_get = AbsenceResponseSerializer
    response_serializer_post = AbsenceResponseSerializer
    response_serializer_patch = AbsenceResponseSerializer

class AbsenceTypeAPIView(GenericCRUDAPIView):
    model = AbsenceType
    
    request_serializer_get = AbsenceTypeGetRequestSerializer
    request_serializer_post = AbsenceTypePostRequestSerializer
    request_serializer_patch = AbsenceTypePatchRequestSerializer
    
    response_serializer_get = AbsenceTypeResponseSerializer
    response_serializer_post = AbsenceTypeResponseSerializer
    response_serializer_patch = AbsenceTypeResponseSerializer

class WorktimeAPIView(GenericCRUDAPIView):
    model = Worktime
    
    request_serializer_get = WorktimeGetRequestSerializer
    request_serializer_post = WorktimePostRequestSerializer
    request_serializer_patch = WorktimePatchRequestSerializer
    
    response_serializer_get = WorktimeResponseSerializer
    response_serializer_post = WorktimeResponseSerializer
    response_serializer_patch = WorktimeResponseSerializer