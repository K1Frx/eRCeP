from rest_framework.views import APIView, Response, status

class GenericPaginationAPIView(APIView):

    def paginate(self, queryset, page=None, per_page=None):
        if page is None:
            page = 1
        if per_page is None:
            per_page=100
            
        if per_page < 1:
            per_page = 1
        elif per_page > 500:
            per_page = 500

        total = len(queryset)
        num_pages = int(total / per_page)
        if total % per_page != 0:
            num_pages += 1

        if page < 1:
            page = 1
        elif page > num_pages:
            page = num_pages
            if page == 0:
                page = 1

        index_start = (page - 1) * per_page
        index_finish = index_start + per_page
        if index_finish > total:
            index_finish = total

        return {
            "page": page,
            "total": total,
            "per_page": per_page,
            "num_pages": num_pages,
            "offset": index_start,
            "items": queryset[index_start:index_finish]
        }
        
class GenericCRUDAPIView(GenericPaginationAPIView):
    
    def get(self, request):
        try:
            serializer = self.request_serializer_get(data=request.query_params)
            if serializer.is_valid():
                filters = serializer.validated_data
                data = self.model.objects.filter(**filters)
                data = self.paginate(data, filters.get('page', None), filters.get('per_page', None))
                response = self.response_serializer_get(data)
                return Response(response.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request):
        try:
            serializer = self.request_serializer_post(data=request.data)
            if serializer.is_valid():
                serializer.save()
                obj = self.model.objects.get(pk=serializer.data['id'])
                data = self.paginate(obj, 1, 1)
                response = self.response_serializer_post(data)
                return Response(response.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
    def patch(self, request, pk):
        try:
            obj = self.model.objects.get(pk=pk)
        except:
            return Response(f"{self.model.__class__.__name__} not found", status=status.HTTP_404_NOT_FOUND)
        
        try:
            serializer = self.request_serializer_patch(obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                obj = self.model.objects.get(pk=pk)
                data = self.paginate(obj, 1, 1)
                response = self.response_serializer_patch(data)
                return Response(response.data, status=status.HTTP_202_ACCEPTED)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        try:
            obj = self.model.objects.get(pk=pk)
        except:
            return Response(f"{self.model.__class__.__name__} not found", status=status.HTTP_404_NOT_FOUND)

        try:
            obj.delete()
            return Response(f"{self.model.__class__.__name__} deleted succesfully", status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        
    class Meta:
        abstract = True