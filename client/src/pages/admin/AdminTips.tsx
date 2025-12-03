import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Lightbulb } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface Tip {
  _id: string;
  title: string;
  body: string;
  ageRange: string;
  category: string;
  isActive: boolean;
}

export const AdminTips = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTip, setEditingTip] = useState<Tip | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    ageRange: '',
    category: '',
    isActive: true
  });

  const categories = ['feeding', 'sleep', 'health', 'development', 'safety', 'parenting'];
  const ageRanges = ['0-6 months', '6-12 months', '1-2 years', '2-3 years', '3+ years'];

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAllTips();
      setTips(data);
    } catch (error) {
      console.error('Error fetching tips:', error);
      alert('Failed to fetch tips');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      await adminApi.createTip(formData);
      setIsAddDialogOpen(false);
      resetForm();
      fetchTips();
      alert('Tip added successfully!');
    } catch (error) {
      console.error('Error adding tip:', error);
      alert('Failed to add tip');
    }
  };

  const handleEdit = async () => {
    if (!editingTip) return;
    
    try {
      await adminApi.updateTip(editingTip._id, formData);
      setIsEditDialogOpen(false);
      setEditingTip(null);
      resetForm();
      fetchTips();
      alert('Tip updated successfully!');
    } catch (error) {
      console.error('Error updating tip:', error);
      alert('Failed to update tip');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tip?')) return;
    
    try {
      await adminApi.deleteTip(id);
      fetchTips();
      alert('Tip deleted successfully!');
    } catch (error) {
      console.error('Error deleting tip:', error);
      alert('Failed to delete tip');
    }
  };

  const openEditDialog = (tip: Tip) => {
    setEditingTip(tip);
    setFormData({
      title: tip.title,
      body: tip.body,
      ageRange: tip.ageRange,
      category: tip.category,
      isActive: tip.isActive
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      body: '',
      ageRange: '',
      category: '',
      isActive: true
    });
  };

  const TipForm = () => (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Tip Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Keep baby's room at comfortable temperature"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="body">Tip Content *</Label>
        <textarea
          id="body"
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          placeholder="Maintain room temperature between 20-22°C for optimal comfort..."
          className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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
          <Label htmlFor="ageRange">Age Range *</Label>
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
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
        />
        <Label htmlFor="isActive">Active (show to users)</Label>
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
          <h2 className="text-3xl font-bold text-gray-900">Parenting Tips</h2>
          <p className="text-gray-600">Manage helpful tips for parents</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500" onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Tip
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Tip</DialogTitle>
            </DialogHeader>
            <TipForm />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAdd} disabled={!formData.title || !formData.body || !formData.category || !formData.ageRange}>
                Add Tip
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            All Tips ({tips.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Age Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tips.map((tip) => (
                <TableRow key={tip._id}>
                  <TableCell className="font-medium max-w-xs">
                    <div>
                      <div className="font-semibold">{tip.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{tip.body}</div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">
                    <Badge variant="outline">{tip.category}</Badge>
                  </TableCell>
                  <TableCell>{tip.ageRange}</TableCell>
                  <TableCell>
                    <Badge className={tip.isActive ? 'bg-green-500' : 'bg-gray-400'}>
                      {tip.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(tip)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(tip._id)} className="text-red-600 hover:text-red-700">
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
            <DialogTitle>Edit Tip</DialogTitle>
          </DialogHeader>
          <TipForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
