import { products } from '@/data/products';

export default function TestIndex() {
  console.log('TestIndex rendering');
  console.log('Products:', products);
  
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">DigiStore Test Page</h1>
      <p className="text-lg mb-4">Products loaded: {products.length}</p>
      
      <div className="grid gap-4">
        {products.slice(0, 3).map((product) => (
          <div key={product.id} className="bg-white p-4 rounded border">
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-600 font-bold">₦{product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}