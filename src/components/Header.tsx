interface IHeaderProps {
  category: string
}

export function Header({ category }: IHeaderProps) {
  return (
    <header>
          <span className="category">Categoria:<span> {category}</span></span>
    </header>
  )
}