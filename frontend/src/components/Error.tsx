// src/components/Error.tsx
import { Alert } from '@mui/material';
const Error = ({ message }: { message: string }) => <Alert severity="error">{message}</Alert>;
export default Error;