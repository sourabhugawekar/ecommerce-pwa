import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Baby, Check } from 'lucide-react';

interface MilestoneItem {
  id: string;
  name: string;
  category: string;
}

const milestoneData: Record<string, MilestoneItem[]> = {
  '0-3 months': [
    { id: '1', name: 'Newborn swaddles', category: 'Clothing' },
    { id: '2', name: 'Feeding bottles & sterilizer', category: 'Feeding' },
    { id: '3', name: 'Diapers (newborn size)', category: 'Hygiene' },
    { id: '4', name: 'Baby wipes', category: 'Hygiene' },
    { id: '5', name: 'Gentle baby wash', category: 'Bath' },
    { id: '6', name: 'Soft towels', category: 'Bath' },
  ],
  '3-6 months': [
    { id: '7', name: 'Teething toys', category: 'Toys' },
    { id: '8', name: 'Play mat', category: 'Development' },
    { id: '9', name: 'Baby carrier', category: 'Travel' },
    { id: '10', name: 'Size 1 diapers', category: 'Hygiene' },
    { id: '11', name: 'Soft books', category: 'Development' },
  ],
  '6-12 months': [
    { id: '12', name: 'High chair', category: 'Feeding' },
    { id: '13', name: 'Sippy cups', category: 'Feeding' },
    { id: '14', name: 'Baby food maker', category: 'Feeding' },
    { id: '15', name: 'Crawling toys', category: 'Toys' },
    { id: '16', name: 'Baby-proofing kit', category: 'Safety' },
    { id: '17', name: 'First shoes', category: 'Clothing' },
  ],
};

interface MilestoneChecklistProps {
  ageRange?: string;
}

export const MilestoneChecklist = ({ ageRange = '0-3 months' }: MilestoneChecklistProps) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const items = milestoneData[ageRange] || milestoneData['0-3 months'];

  const toggleItem = (id: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const completedCount = checkedItems.size;
  const totalCount = items.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Baby className="h-6 w-6 text-pink-500" />
            <CardTitle className="text-2xl">Milestones & Essentials</CardTitle>
          </div>
          <Badge className="bg-pink-500 text-white">
            {completedCount}/{totalCount}
          </Badge>
        </div>
        <CardDescription>
          {ageRange} • Your personalized baby essentials checklist
        </CardDescription>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">{progress}% complete</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item) => {
            const isChecked = checkedItems.has(item.id);
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  isChecked
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-gray-200 hover:border-pink-300'
                }`}
              >
                <Checkbox
                  id={item.id}
                  checked={isChecked}
                  onCheckedChange={() => toggleItem(item.id)}
                />
                <label
                  htmlFor={item.id}
                  className={`flex-grow cursor-pointer ${
                    isChecked ? 'text-gray-500 line-through' : 'text-gray-800'
                  }`}
                >
                  <span className="font-medium">{item.name}</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {item.category}
                  </Badge>
                </label>
                {isChecked && <Check className="h-5 w-5 text-green-500" />}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
