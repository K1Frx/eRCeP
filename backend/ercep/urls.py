from django.urls import path
from ercep.api.api import WorkerAPIView, EmployerAPIView, ContractAPIView, AbsenceAPIView, AbsenceTypeAPIView, WorktimeAPIView, CustomAuthToken

urlpatterns = [
    path("login/", CustomAuthToken.as_view(), name="login"),
    path("api/workers/", WorkerAPIView.as_view(), name="workers"),
    path("api/workers/<int:pk>/", WorkerAPIView.as_view(), name="workers"),
    path("api/employers/", EmployerAPIView.as_view(), name="employers"),
    path("api/employers/<int:pk>/", EmployerAPIView.as_view(), name="employers"),
    path("api/contracts/", ContractAPIView.as_view(), name="contracts"),
    path("api/contracts/<int:pk>/", ContractAPIView.as_view(), name="contracts"),
    path("api/absences/", AbsenceAPIView.as_view(), name="absences"),
    path("api/absences/<int:pk>/", AbsenceAPIView.as_view(), name="absences"),
    path("api/absence-types/", AbsenceTypeAPIView.as_view(), name="absence_types"),
    path("api/absence-types/<int:pk>/", AbsenceTypeAPIView.as_view(), name="absence_types"),
    path("api/worktimes/", WorktimeAPIView.as_view(), name="worktimes"),
    path("api/worktimes/<int:pk>/", WorktimeAPIView.as_view(), name="worktimes"),
]