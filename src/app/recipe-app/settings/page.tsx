"use client";

import React, { useState, useEffect } from 'react';
import { FamilyMember, Gender, loadFamilyData, saveFamilyData, DEFAULT_MEMBER } from '../lib/family-logic';

export default function FamilySettingsPage() {
  const [family, setFamily] = useState<FamilyMember[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>(DEFAULT_MEMBER);

  useEffect(() => {
    setFamily(loadFamilyData());
  }, []);

  const handleSave = (updatedFamily: FamilyMember[]) => {
    setFamily(updatedFamily);
    saveFamilyData(updatedFamily);
  };

  const addOrUpdateMember = () => {
    if (!newMember.name) return;

    if (editingId) {
      // 更新処理
      const updated = family.map(m => m.id === editingId ? { ...m, ...newMember } : m);
      handleSave(updated as FamilyMember[]);
      setEditingId(null);
    } else {
      // 新規追加
      const member: FamilyMember = {
        ...DEFAULT_MEMBER,
        ...newMember,
        id: Math.random().toString(36).substr(2, 9),
      } as FamilyMember;
      handleSave([...family, member]);
    }

    setNewMember(DEFAULT_MEMBER);
    setIsAdding(false);
  };

  const startEdit = (member: FamilyMember) => {
    setNewMember(member);
    setEditingId(member.id);
    setIsAdding(true);
  };

  const removeMember = (id: string) => {
    if (confirm('この家族の情報を削除してもよろしいですか？')) {
      const updated = family.filter(m => m.id !== id);
      handleSave(updated);
    }
  };

  return (
    <main className="container min-h-screen" style={{ paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#fff', marginBottom: '0.5rem' }}>家族構成の設定</h1>
        <p className="text-muted">家族の好みや制限に合わせて、AIが最適な献立をプランニングします。</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {family.map(member => (
          <div key={member.id} className="glass-card" style={{ padding: '1.5rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: '50%', 
                  background: member.gender === 'male' ? '#1e3a8a' : member.gender === 'female' ? '#831843' : '#334155',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginRight: '1rem'
                }}>
                  {member.gender === 'male' ? '👨' : member.gender === 'female' ? '👩' : '👤'}
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{member.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--recipe-muted)' }}>{member.age}歳 · {member.gender === 'male' ? '男性' : member.gender === 'female' ? '女性' : 'その他'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => startEdit(member)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>編集</button>
                <button onClick={() => removeMember(member.id)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '0.8rem' }}>削除</button>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem' }}>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#f87171' }}>⚠️ アレルギー:</span> {member.allergies.length > 0 ? member.allergies.join(', ') : 'なし'}</div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#34d399' }}>🥗 好き:</span> {member.likes.length > 0 ? member.likes.join(', ') : '未設定'}</div>
              <div><span style={{ color: 'var(--recipe-muted)' }}>❌ 苦手:</span> {member.dislikes.length > 0 ? member.dislikes.join(', ') : '未設定'}</div>
            </div>
          </div>
        ))}

        {/* Add/Edit Form Card */}
        {isAdding ? (
          <div className="glass-card" style={{ padding: '1.5rem', border: '2px solid var(--recipe-primary)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{editingId ? 'メンバーを編集' : 'メンバーを追加'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <input 
                type="text" placeholder="名前" value={newMember.name || ''}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
                onChange={e => setNewMember({...newMember, name: e.target.value})}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <input 
                  type="number" placeholder="年齢" value={newMember.age || ''}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
                  onChange={e => setNewMember({...newMember, age: parseInt(e.target.value)})}
                />
                <select 
                  value={newMember.gender}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
                  onChange={e => setNewMember({...newMember, gender: e.target.value as Gender})}
                >
                  <option value="other">性別</option>
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">その他</option>
                </select>
              </div>
              <input 
                type="text" placeholder="アレルギー (カンマ区切り)" value={newMember.allergies?.join(',') || ''}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
                onChange={e => setNewMember({...newMember, allergies: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
              />
              <input 
                type="text" placeholder="好きなもの (カンマ区切り)" value={newMember.likes?.join(',') || ''}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
                onChange={e => setNewMember({...newMember, likes: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
              />
              <input 
                type="text" placeholder="苦手なもの (カンマ区切り)" value={newMember.dislikes?.join(',') || ''}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px' }}
                onChange={e => setNewMember({...newMember, dislikes: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
              />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button onClick={addOrUpdateMember} className="btn-primary" style={{ flex: 1, padding: '0.6rem' }}>{editingId ? '更新' : '保存'}</button>
                <button onClick={() => { setIsAdding(false); setEditingId(null); setNewMember(DEFAULT_MEMBER); }} style={{ flex: 1, padding: '0.6rem', background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', borderRadius: '12px' }}>キャンセル</button>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsAdding(true)}
            style={{ 
              border: '2px dashed rgba(255,255,255,0.1)', background: 'none', borderRadius: '20px', 
              padding: '2rem', color: 'var(--recipe-muted)', cursor: 'pointer', transition: 'all 0.2s' 
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>＋</div>
            家族メンバーを追加
          </button>
        )}
      </div>
    </main>
  );
}
