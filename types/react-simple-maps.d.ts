declare module 'react-simple-maps' {
  import type {CSSProperties, ReactNode, SVGProps} from 'react'

  interface ProjectionConfig {
    scale?: number
    center?: [number, number]
    parallels?: [number, number]
    rotate?: [number, number, number?]
  }

  interface ComposableMapProps extends SVGProps<SVGSVGElement> {
    projection?: string | (() => unknown)
    projectionConfig?: ProjectionConfig
    width?: number
    height?: number
    style?: CSSProperties
    children?: ReactNode
  }

  interface GeographyStyle {
    default?: CSSProperties
    hover?: CSSProperties
    pressed?: CSSProperties
  }

  interface GeographyFeature {
    rsmKey: string
    [key: string]: unknown
  }

  interface GeographiesProps {
    geography: string | Record<string, unknown>
    children: (props: {geographies: GeographyFeature[]}) => ReactNode
  }

  interface GeographyProps extends SVGProps<SVGPathElement> {
    geography: GeographyFeature
    style?: GeographyStyle
    tabIndex?: number
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element
  export function Geographies(props: GeographiesProps): JSX.Element
  export function Geography(props: GeographyProps): JSX.Element
  export function Graticule(props: SVGProps<SVGPathElement>): JSX.Element
  export function Sphere(props: SVGProps<SVGPathElement>): JSX.Element
  export function Marker(props: {coordinates: [number, number]; children?: ReactNode} & SVGProps<SVGGElement>): JSX.Element
}
