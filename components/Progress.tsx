'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Target, Award, Calendar, Brain, Heart } from 'lucide-react';

const moodData = [
  { date: '1/1', mood: 3, sessions: 1 },
  { date: '1/2', mood: 3, sessions: 1 },
  { date: '1/3', mood: 2, sessions: 0 },
  { date: '1/4', mood: 4, sessions: 1 },
  { date: '1/5', mood: 4, sessions: 1 },
  { date: '1/6', mood: 3, sessions: 0 },
  { date: '1/7', mood: 5, sessions: 1 },
  { date: '1/8', mood: 4, sessions: 1 },
  { date: '1/9', mood: 4, sessions: 1 },
  { date: '1/10', mood: 3, sessions: 0 },
  { date: '1/11', mood: 4, sessions: 1 },
  { date: '1/12', mood: 5, sessions: 1 },
  { date: '1/13', mood: 4, sessions: 1 },
  { date: '1/14', mood: 4, sessions: 1 },
  { date: '1/15', mood: 5, sessions: 1 },
];

const sessionData = [
  { name: 'Completed', value: 85, color: '#059669' },
  { name: 'Remaining', value: 15, color: '#e2e8f0' },
];

const goals = [
  { name: 'Manage anxiety', progress: 65, color: 'bg-blue-500' },
  { name: 'Improve mood', progress: 78, color: 'bg-green-500' },
  { name: 'Learn coping strategies', progress: 45, color: 'bg-purple-500' },
  { name: 'Build healthier habits', progress: 32, color: 'bg-orange-500' },
];

const badges = [
  { name: 'First Session Complete!', icon: '🎯', earned: true, date: 'Jan 15' },
  { name: '7-Day Streak!', icon: '🔥', earned: true, date: 'Jan 21' },
  { name: 'Mood Tracker', icon: '📊', earned: true, date: 'Jan 18' },
  { name: 'Goal Setter', icon: '🎯', earned: true, date: 'Jan 15' },
  { name: 'CBT Explorer', icon: '🧠', earned: true, date: 'Jan 16' },
  { name: 'Journal Writer', icon: '📝', earned: true, date: 'Jan 17' },
  { name: '30-Day Warrior', icon: '⚔️', earned: false, date: null },
  { name: 'Anxiety Conqueror', icon: '🦾', earned: false, date: null },
];

export default function Progress() {
  const averageMood = moodData.reduce((sum, day) => sum + day.mood, 0) / moodData.length;
  const totalSessions = moodData.reduce((sum, day) => sum + day.sessions, 0);
  const adherencePercentage = (totalSessions / moodData.length) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          My Progress
        </h1>
        <p className="text-slate-600 mt-1">
          Track your wellness journey and celebrate your achievements
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Average Mood</p>
                <p className="text-2xl font-bold text-slate-800">{averageMood.toFixed(1)}</p>
              </div>
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Sessions</p>
                <p className="text-2xl font-bold text-slate-800">{totalSessions}</p>
              </div>
              <Brain className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Adherence</p>
                <p className="text-2xl font-bold text-slate-800">{adherencePercentage.toFixed(0)}%</p>
              </div>
              <Target className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Badges Earned</p>
                <p className="text-2xl font-bold text-slate-800">{badges.filter(b => b.earned).length}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood & Symptom Trends */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Mood & Engagement Trends
            </CardTitle>
            <CardDescription>
              Your mood patterns and session completion over the last 15 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis domain={[1, 5]} stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#0f172a" 
                    strokeWidth={3}
                    dot={{ fill: '#0f172a', strokeWidth: 2, r: 4 }}
                    name="Mood"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Session Adherence */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Session Adherence
            </CardTitle>
            <CardDescription>
              Your consistency with CBT sessions this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sessionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      dataKey="value"
                    >
                      {sessionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800">85%</div>
                    <div className="text-xs text-slate-500">Complete</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                Great Progress!
              </Badge>
              <p className="text-sm text-slate-600 mt-2">
                You've completed {totalSessions} out of {moodData.length} recommended sessions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals & Milestones */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-accent" />
            Goals & Milestones
          </CardTitle>
          <CardDescription>
            Track your progress towards your wellness goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">{goal.name}</span>
                  <span className="text-sm text-slate-500">{goal.progress}%</span>
                </div>
                <ProgressBar value={goal.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Collection */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Achievement Gallery
          </CardTitle>
          <CardDescription>
            Your earned badges and upcoming milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  badge.earned
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-md'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="text-2xl mb-2">{badge.icon}</div>
                <div className="font-medium text-sm text-slate-700 mb-1">{badge.name}</div>
                {badge.earned && badge.date && (
                  <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
                    {badge.date}
                  </Badge>
                )}
                {!badge.earned && (
                  <Badge variant="secondary" className="text-xs">
                    Locked
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}