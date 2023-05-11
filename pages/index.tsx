import { Inter } from 'next/font/google'
import {ActionIcon, Box, Group, Text, Title, UnstyledButton, useMantineTheme} from "@mantine/core"

import ResultsPage from '../components/ResultsPage';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const theme = useMantineTheme();
  return (
    <div>
      <div className = 'openAlexTitle'>OpenAlex Search</div>
      <ResultsPage />
    </div>
  )
}
