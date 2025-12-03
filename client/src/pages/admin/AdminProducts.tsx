import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import { adminApi, Product } from '@/lib/api';

export const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stockCount: '',
    emoji: '',
    imageUrl: '',
    description: '',
    ageRange: ''
  });

  const categories = ['clothing', 'diapers', 'feeding', 'toys', 'nursery', 'bath', 'health', 'safety'];
  const ageRanges = ['0-6 months', '6-12 months', '1-2 years', '2-3 years', '3+ years'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        stockCount: parseInt(formData.stockCount),
        emoji: formData.emoji || undefined,
        imageUrl: formData.imageUrl || undefined,
        description: formData.description || undefined,
        ageRange: formData.ageRange || undefined
      };
      
      await adminApi.createProduct(productData);
      setIsAddDialogOpen(false);
      resetForm();
      fetchProducts();
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  const handleEdit = async () => {
    if (!editingProduct) return;
    
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        stockCount: parseInt(formData.stockCount),
        emoji: formData.emoji || undefined,
        imageUrl: formData.imageUrl || undefined,
        description: formData.description || undefined,
        ageRange: formData.ageRange || undefined
      };
      
      await adminApi.updateProduct(editingProduct._id, productData);
      setIsEditDialogOpen(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await adminApi.deleteProduct(id);
      fetchProducts();
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stockCount: (product.stockCount ?? 0).toString(),
      emoji: product.emoji || '',
      imageUrl: product.imageUrl || '',
      description: product.description || '',
      ageRange: product.ageRange || ''
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: '',
      stockCount: '',
      emoji: '',
      imageUrl: '',
      description: '',
      ageRange: ''
    });
  };

  const ProductForm = () => (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Organic Cotton Onesie"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="299"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="stockCount">Stock Count *</Label>
          <Input
            id="stockCount"
            type="number"
            value={formData.stockCount}
            onChange={(e) => setFormData({ ...formData, stockCount: e.target.value })}
            placeholder="50"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">Category *</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="ageRange">Age Range</Label>
        <Select value={formData.ageRange} onValueChange={(value) => setFormData({ ...formData, ageRange: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select age range" />
          </SelectTrigger>
          <SelectContent>
            {ageRanges.map(range => (
              <SelectItem key={range} value={range}>{range}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="emoji">Emoji</Label>
          <Input
            id="emoji"
            value={formData.emoji}
            onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
            placeholder="👶"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Soft and comfortable for your baby"
        />
      </div>
    </div>
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={!formData.name || !formData.price || !formData.category || !formData.stockCount}>
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            All Products ({products.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Age Range</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {product.emoji && <span className="text-2xl">{product.emoji}</span>}
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{product.category}</TableCell>
                  <TableCell>₹{product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stockCount}</TableCell>
                  <TableCell>{product.ageRange || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(product)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
