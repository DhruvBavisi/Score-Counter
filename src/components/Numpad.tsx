 

interface NumpadProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  onClose: () => void;
  onMove?: (dir: 'up' | 'down' | 'left' | 'right') => void;
  rowIndex?: number;
  colIndex?: number;
  playerName?: string;
}

export function Numpad({ value, onChange, onEnter, onClose, onMove, rowIndex, colIndex, playerName }: NumpadProps) {
  const handleButton = (btn: string) => {
    if (btn === 'C') {
      onChange('');
    } else if (btn === '←') {
      onChange(value.slice(0, -1));
    } else if (btn === '+/-') {
      if (value.startsWith('-')) {
        onChange(value.slice(1));
      } else if (value && value !== '0') {
        onChange('-' + value);
      }
    } else if (btn === 'Enter') {
      onEnter();
    } else {
      // Number buttons
      if (value === '0' && btn !== '.') {
        onChange(btn);
      } else {
        onChange(value + btn);
      }
    }
  };

  const buttons = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['+/-', '0', '←'],
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-transparent animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg glass-card rounded-t-3xl p-3 sm:p-4 pb-4 sm:pb-6 mb-6 safe-bottom animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Context + Value */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="text-xs sm:text-sm text-muted-foreground">
            {typeof rowIndex === 'number' && typeof colIndex === 'number' ? `R${rowIndex + 1} • C${colIndex + 1}${playerName ? ` • ${playerName}` : ''}` : ''}
          </div>
          <div className="text-2xl sm:text-3xl font-display font-bold text-foreground min-w-[90px] sm:min-w-[100px] text-right">
            {value || '0'}
          </div>
        </div>

        {/* (Navigation removed as requested) */}

        {/* Numpad Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3">
          {buttons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => handleButton(btn)}
              className="numpad-btn h-12 sm:h-14 md:h-16 text-lg sm:text-xl font-semibold"
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <button
            onClick={() => handleButton('C')}
            className="numpad-btn h-11 sm:h-12 md:h-14 bg-destructive/15 text-destructive hover:bg-destructive/25"
          >
            Clear
          </button>
          <button
            onClick={() => handleButton('Enter')}
            className="numpad-btn h-11 sm:h-12 md:h-14 bg-gradient-primary text-primary-foreground font-bold"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}
