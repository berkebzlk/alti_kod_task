from oscar.apps.catalogue.models import Product
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import ProductSerializer

# Create your views here.

@api_view(['GET'])
def getAllProducts(request):
    instance = Product.objects.all()
    data = {}

    if instance:
        serializer = ProductSerializer(instance, many=True)

    data = serializer.data
    
    return Response(data)


