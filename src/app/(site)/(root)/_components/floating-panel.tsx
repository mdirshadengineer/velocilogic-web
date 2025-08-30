'use client';

import {
  Calculator,
  Calendar,
  CreditCard,
  Mic,
  Settings,
  Smile,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from 'shared/ui/command';

import React from 'react';

export function FloatingPanel() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // Add this function to speak aloud
  const speakVoiceMessage = (msg: string) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      // Ensure voices are loaded
      const loadAndSpeak = () => {
        const voices = synth.getVoices();
        // Prefer high-quality female voices
        const preferredVoice =
          voices.find(
            v =>
              v.lang.startsWith('en') &&
              v.name.toLowerCase().includes('google') &&
              v.name.toLowerCase().includes('female')
          ) ||
          voices.find(
            v =>
              v.lang.startsWith('en') &&
              (v.name.toLowerCase().includes('samantha') ||
                v.name.toLowerCase().includes('zira') ||
                v.name.toLowerCase().includes('female'))
          );
        const utter = new window.SpeechSynthesisUtterance(msg);
        utter.rate = 1;
        utter.pitch = 1;
        utter.volume = 1;
        if (preferredVoice) {
          utter.voice = preferredVoice;
        }
        synth.speak(utter);
      };
      // Some browsers need voices to be loaded asynchronously
      if (synth.getVoices().length === 0) {
        synth.onvoiceschanged = loadAndSpeak;
      } else {
        loadAndSpeak();
      }
    }
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div className="fixed right-2 bottom-2">
        <button
          className="flex items-center gap-3 rounded-full bg-white p-2 text-sm font-medium text-black shadow-md transition hover:bg-gray-100 hover:shadow-lg dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
          onClick={() => setOpen(true)}
        >
          {/* Settings icon in a circle */}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
            <Settings className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </span>
          {/* Theme control (example: sun/moon toggle) */}
          {/* Replace below with your theme toggle logic/component */}
          {/* <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800">
            <svg
              className="w-5 h-5 text-yellow-500 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 19.778l-.707-.707M21 12h-1M4 12H3m16.485-4.485l-.707-.707M4.222 4.222l-.707.707" />
              <circle cx="12" cy="12" r="5" />
            </svg>
          </span> */}
          {/* <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
            <span className="text-xs">⌘</span>J
          </kbd> */}
        </button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Enterprise Controls">
            <CommandItem>
              <Settings />
              <span>Application Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <User />
              <span>User Management</span>
              <CommandShortcut>⌘U</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing & Subscription</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Calendar />
              <span>Audit Logs</span>
              <CommandShortcut>⌘A</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Test Environment">
            <CommandItem
              onSelect={() => {
                speakVoiceMessage('Initiating Demo Environment');
                setOpen(false);
                // route to /demo page
                router.push('/demo');
              }}
            >
              <Smile />
              <span>Spin up demo environment</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Utilities">
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                speakVoiceMessage('Initiating Voice Command mode')
              }
            >
              <Mic />
              <span>Voice Command</span>
              <CommandShortcut>⌘V</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
