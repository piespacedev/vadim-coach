/** Толщина рамки (титан + чёрный ободок) в долях ширины телефона. Синхронно с .iphone в index.css. */
export const BEZEL = 0.034

/**
 * Рамка iPhone 15 Pro вокруг скриншота. Ширину задаёт родитель,
 * все размеры внутри — в cqw (см. .iphone в index.css), поэтому рамка масштабируется целиком.
 * children кладутся поверх экрана и не обрезаются его скруглением.
 */
export default function PhoneFrame({ src, alt, width, height, children }) {
  return (
    <div className="iphone">
      <span className="iphone-btn iphone-btn-action" />
      <span className="iphone-btn iphone-btn-up" />
      <span className="iphone-btn iphone-btn-down" />
      <span className="iphone-btn iphone-btn-power" />

      <div className="iphone-body">
        <div className="iphone-screen">
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            className="block h-full w-full object-cover object-top"
          />
          <span className="iphone-island" />
        </div>
      </div>

      <div className="iphone-overlay">{children}</div>
    </div>
  )
}
