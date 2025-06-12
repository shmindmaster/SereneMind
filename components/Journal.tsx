'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Calendar, Edit3, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood?: number;
  tags: string[];
}

const sampleEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'First day with SereneMind',
    content: 'Today I started my journey with the SereneMind platform. I feel hopeful about this new approach to managing my anxiety. The onboarding process was smooth and I appreciate how it explains everything clearly. I set some goals around managing my anxiety and improving my mood. Looking forward to seeing how this helps.',
    date: new Date('2024-01-15'),
    mood: 3,
    tags: ['anxiety', 'first-day', 'hopeful'],
  },
  {
    id: '2',
    title: 'Difficult day at work',
    content: 'Work was particularly stressful today. Had a challenging meeting with my manager about project deadlines. I noticed my anxiety rising throughout the day. Used some of the breathing techniques from yesterday\'s session, which helped a bit. Need to remember to practice these more regularly.',
    date: new Date('2024-01-16'),
    mood: 2,
    tags: ['work-stress', 'anxiety', 'coping-techniques'],
  },
  {
    id: '3',
    title: 'Better mood today',
    content: 'Feeling much better today! Yesterday\'s CBT session really helped me process my work stress. I\'m starting to see patterns in my thinking that I hadn\'t noticed before. The cognitive restructuring exercise was particularly helpful. Planning to practice it more this week.',
    date: new Date('2024-01-17'),
    mood: 4,
    tags: ['improvement', 'cbt', 'positive'],
  },
];

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(sampleEntries);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(entries[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditEntry = () => {
    if (selectedEntry) {
      setEditTitle(selectedEntry.title);
      setEditContent(selectedEntry.content);
      setIsEditing(true);
    }
  };

  const handleSaveEntry = () => {
    if (selectedEntry) {
      const updatedEntry = {
        ...selectedEntry,
        title: editTitle,
        content: editContent,
      };
      setEntries(prev => prev.map(entry => 
        entry.id === selectedEntry.id ? updatedEntry : entry
      ));
      setSelectedEntry(updatedEntry);
      setIsEditing(false);
    }
  };

  const handleNewEntry = () => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: 'New Entry',
      content: '',
      date: new Date(),
      tags: [],
    };
    setEntries(prev => [newEntry, ...prev]);
    setSelectedEntry(newEntry);
    setEditTitle(newEntry.title);
    setEditContent(newEntry.content);
    setIsEditing(true);
  };

  const getMoodColor = (mood?: number) => {
    if (!mood) return 'bg-slate-100 text-slate-600';
    if (mood <= 2) return 'bg-red-100 text-red-700';
    if (mood === 3) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  const getMoodLabel = (mood?: number) => {
    if (!mood) return 'No mood';
    const labels = ['Very Bad', 'Bad', 'Neutral', 'Good', 'Very Good'];
    return labels[mood - 1];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            Journal
          </h1>
          <p className="text-slate-600 mt-1">
            Reflect on your thoughts and track your progress over time
          </p>
        </div>
        <Button onClick={handleNewEntry} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Entry
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Entries List */}
        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Your Entries</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              <div className="space-y-2 p-4">
                {filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                      selectedEntry?.id === entry.id
                        ? 'bg-primary/5 border-primary/20'
                        : 'hover:bg-slate-50 border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-slate-800 text-sm line-clamp-1">
                        {entry.title}
                      </h3>
                      {entry.mood && (
                        <Badge variant="secondary" className={`text-xs ${getMoodColor(entry.mood)}`}>
                          {getMoodLabel(entry.mood)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-2">
                      {entry.content}
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-400">
                        {entry.date.toLocaleDateString()}
                      </span>
                    </div>
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {entry.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                            {tag}
                          </Badge>
                        ))}
                        {entry.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs px-1 py-0">
                            +{entry.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Entry Editor/Viewer */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0 bg-white h-full">
            {selectedEntry ? (
              <>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">
                        {isEditing ? (
                          <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="text-lg font-semibold"
                          />
                        ) : (
                          selectedEntry.title
                        )}
                      </CardTitle>
                      {selectedEntry.mood && (
                        <Badge className={getMoodColor(selectedEntry.mood)}>
                          {getMoodLabel(selectedEntry.mood)}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button size="sm" onClick={handleSaveEntry}>
                            Save
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleEditEntry}
                          className="flex items-center gap-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {selectedEntry.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      placeholder="What's on your mind today?"
                      className="min-h-[400px] resize-none text-sm leading-relaxed"
                    />
                  ) : (
                    <ScrollArea className="h-96">
                      <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                        {selectedEntry.content || (
                          <div className="text-slate-400 italic">
                            No content yet. Click "Edit" to add your thoughts.
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  )}
                  
                  {selectedEntry.tags.length > 0 && !isEditing && (
                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <div className="flex flex-wrap gap-2">
                        {selectedEntry.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-slate-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select an entry to view or create a new one</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}