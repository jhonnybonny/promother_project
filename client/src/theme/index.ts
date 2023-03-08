import { createTheme } from '@mui/material';
import { getDesignTokens, PaletteMode } from './theme-switch';


export const setupTheme = (mode: PaletteMode) => createTheme(getDesignTokens(mode));