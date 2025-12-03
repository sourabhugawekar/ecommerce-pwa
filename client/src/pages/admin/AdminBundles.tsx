import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Gift } from 'lucide-react';
import { adminApi, Bundle } from '@/lib/api';
import { Badge } from '@/components/ui/badge';

interface BundleCreateUpdate {
  name: string;
  description: string;
  productIds: string[];
  bundlePrice: number;
  originalPrice: number;
  ageRange?: string;
}

export const AdminBundles = () => {
  const [bundles, setBundles] = useState<Bundle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    productIds: '',
    bundlePrice: '',
    originalPrice: '',
    ageRange: ''
  });

  useEffect(() => {
    fetchBundles();
  }, []);

  const fetchBundles = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAllBundles();
      setBundles(data);
    } catch (error) {
      console.error('Error fetching bundles:', error);
      alert('Failed to fetch bundles');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const bundleData: BundleCreateUpdate = {
        name: formData.name,
        description: formData.description,
        productIds: formData.productIds.split(',').map(id => id.trim()).filter(id => id),
        bundlePrice: parseFloat(formData.bundlePrice),
        originalPrice: parseFloat(formData.originalPrice),
        ageRange: formData.ageRange || undefined
      };
      
      await adminApi.createBundle(bundleData as any);
      setIsAddDialogOpen(false);
      resetForm();
      fetchBundles();
      alert('Bundle added successfully!');
    } catch (error) {
      console.error('Error adding bundle:', error);
      alert('Failed to add bundle');
    }
  };

  const handleEdit = async () => {
    if (!editingBundle) return;
    
    try {
      const bundleData: BundleCreateUpdate = {
        name: formData.name,
        description: formData.description,
        productIds: formData.productIds.split(',').map(id => id.trim()).filter(id => id),
        bundlePrice: parseFloat(formData.bundlePrice),
        originalPrice: parseFloat(formData.originalPrice),
        ageRange: formData.ageRange || undefined
      };
      
      await adminApi.updateBundle(editingBundle._id, bundleData as any);
      setIsEditDialogOpen(false);
      setEditingBundle(null);
      resetForm();
      fetchBundles();
      alert('Bundle updated successfully!');
    } catch (error) {
      console.error('Error updating bundle:', error);
      alert('Failed to update bundle');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bundle?')) return;
    
    try {
      await adminApi.deleteBundle(id);
      fetchBundles();
      alert('Bundle deleted successfully!');
    } catch (error) {
      console.error('Error deleting bundle:', error);
      alert('Failed to delete bundle');
    }
  };

  const openEditDialog = (bundle: Bundle) => {
    setEditingBundle(bundle);
    // Convert Product[] to string IDs
    const productIdString = Array.isArray(bundle.productIds)
      ? bundle.productIds.map(p => typeof p === 'string' ? p : p._id).join(', ')
      : '';
    setFormData({
      name: bundle.name,
      description: bundle.description,
      productIds: productIdString,
      bundlePrice: bundle.bundlePrice.toString(),
      originalPrice: (bundle.originalPrice ?? 0).toString(),
      ageRange: bundle.ageRange || ''
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      productIds: '',
      bundlePrice: '',
      originalPrice: '',
      ageRange: ''
    });
  };

  const BundleForm = () => (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Bundle Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Newborn Essentials Bundle"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description *</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Everything you need for your newborn"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="productIds">Product IDs (comma-separated) *</Label>
        <Input
          id="productIds"
          value={formData.productIds}
          onChange={(e) => setFormData({ ...formData, productIds: e.target.value })}
          placeholder="abc123, def456, ghi789"
        />
        <p className="text-xs text-gray-500">Enter product IDs separated by commas</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="originalPrice">Original Price (₹) *</Label>
          <Input
            id="originalPrice"
            type="number"
            value={formData.originalPrice}
            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
            placeholder="1500"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="bundlePrice">Bundle Price (₹) *</Label>
          <Input
            id="bundlePrice"
            type="number"
            value={formData.bundlePrice}
            onChange={(e) => setFormData({ ...formData, bundlePrice: e.target.value })}
            placeholder="1200"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="ageRange">Age Range</Label>
        <Input
          id="ageRange"
          value={formData.ageRange}
          onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
          placeholder="0-6 months"
        />
      </div>

      {formData.originalPrice && formData.bundlePrice && (
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-green-800">
            Discount: <strong>{Math.round(((parseFloat(formData.originalPrice) - parseFloat(formData.bundlePrice)) / parseFloat(formData.originalPrice)) * 100)}%</strong>
          </p>
        </div>
      )}
    </div>
  );

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Bundles</h2>
          <p className="text-gray-600">Manage product bundles and deals</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Bundle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Bundle</DialogTitle>
            </DialogHeader>
            <BundleForm />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={!formData.name || !formData.description || !formData.productIds || !formData.bundlePrice || !formData.originalPrice}>
                Add Bundle
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            All Bundles ({bundles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bundle Name</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Original Price</TableHead>
                <TableHead>Bundle Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Age Range</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bundles.map((bundle) => (
                <TableRow key={bundle._id}>
                  <TableCell className="font-medium">{bundle.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{bundle.productIds.length} items</Badge>
                  </TableCell>
                  <TableCell>₹{(bundle.originalPrice ?? 0).toFixed(2)}</TableCell>
                  <TableCell className="font-semibold text-green-600">₹{bundle.bundlePrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className="bg-pink-500">{bundle.discount}% OFF</Badge>
                  </TableCell>
                  <TableCell>{bundle.ageRange || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(bundle)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(bundle._id)} className="text-red-600 hover:text-red-700">
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Bundle</DialogTitle>
          </DialogHeader>
          <BundleForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
