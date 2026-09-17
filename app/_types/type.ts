export interface ChildernProps {
  children?: React.ReactNode;
}

export interface ParamsProps {
  params: Promise<{
    id: string;
  }>;
}
