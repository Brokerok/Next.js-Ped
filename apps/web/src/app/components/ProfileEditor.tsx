"use client";

import { useState, useEffect } from "react";

interface Props {
  initialBio: string;
}

export default function ProfileEditor({ initialBio }: Props) {
  const [bio, setBio] = useState(initialBio);
  const [draft, setDraft] = useState(initialBio);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("profile:bio");
    if (saved !== null) {
      setBio(saved);
      setDraft(saved);
    }
  }, []);

  function handleSave() {
    setBio(draft);
    setEditing(false);
    localStorage.setItem("profile:bio", draft);
  }

  function handleCancel() {
    setDraft(bio);
    setEditing(false);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
          О себе
        </h2>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="text-xs px-3 py-1 rounded-lg border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Изменить
          </button>
        )}
      </div>

      {editing ? (
        <div className="space-y-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.02] px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCancel}
              className="text-sm px-4 py-2 rounded-lg border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              className="text-sm px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition-colors"
            >
              Сохранить
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-foreground/70 leading-relaxed">{bio}</p>
      )}
    </div>
  );
}
