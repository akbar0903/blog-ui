declare module 'react-syntax-highlighter' {
  export * from 'react-syntax-highlighter/dist/cjs'
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  const styles: Record<string, unknown>
  export default styles
}
