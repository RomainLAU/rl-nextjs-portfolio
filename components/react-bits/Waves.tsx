import React, { useEffect, useRef } from 'react';

class Grad {
    x: number
    y: number
    z: number

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    dot2(x: number, y: number): number {
        return this.x * x + this.y * y
    }
}

class Noise {
    private grad3: Grad[]
    private p: number[]
    private perm: number[]
    private gradP: Grad[]

    constructor(seed = 0) {
        this.grad3 = [
            new Grad(1, 1, 0),
            new Grad(-1, 1, 0),
            new Grad(1, -1, 0),
            new Grad(-1, -1, 0),
            new Grad(1, 0, 1),
            new Grad(-1, 0, 1),
            new Grad(1, 0, -1),
            new Grad(-1, 0, -1),
            new Grad(0, 1, 1),
            new Grad(0, -1, 1),
            new Grad(0, 1, -1),
            new Grad(0, -1, -1),
        ]
        this.p = [
            151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120,
            234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71,
            134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63,
            161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226,
            250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152,
            2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97,
            228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84,
            204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
        ]
        this.perm = new Array(512)
        this.gradP = new Array(512)
        this.seed(seed)
    }

    seed(seed: number): void {
        if (seed > 0 && seed < 1) seed *= 65536
        seed = Math.floor(seed)
        if (seed < 256) seed |= seed << 8
        for (let i = 0; i < 256; i++) {
            let v = i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255)
            this.perm[i] = this.perm[i + 256] = v
            this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12]
        }
    }

    private fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10)
    }

    private lerp(a: number, b: number, t: number): number {
        return (1 - t) * a + t * b
    }

    perlin2(x: number, y: number): number {
        let X = Math.floor(x),
            Y = Math.floor(y)
        x = x - X
        y = y - Y
        X = X & 255
        Y = Y & 255
        const n00 = this.gradP[X + this.perm[Y]].dot2(x, y)
        const n01 = this.gradP[X + this.perm[Y + 1]].dot2(x, y - 1)
        const n10 = this.gradP[X + 1 + this.perm[Y]].dot2(x - 1, y)
        const n11 = this.gradP[X + 1 + this.perm[Y + 1]].dot2(x - 1, y - 1)
        const u = this.fade(x)
        return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y))
    }
}

interface Point {
    x: number
    y: number
    wave: {
        x: number
        y: number
    }
    cursor: {
        x: number
        y: number
        vx: number
        vy: number
    }
}

interface Mouse {
    x: number
    y: number
    lx: number
    ly: number
    sx: number
    sy: number
    v: number
    vs: number
    a: number
    set: boolean
}

interface WavesProps {
    lineColor?: string
    backgroundColor?: string
    waveSpeedX?: number
    waveSpeedY?: number
    waveAmpX?: number
    waveAmpY?: number
    xGap?: number
    yGap?: number
    friction?: number
    tension?: number
    maxCursorMove?: number
    style?: React.CSSProperties
    className?: string
    children?: React.ReactNode
}

const Waves: React.FC<WavesProps> = ({
    lineColor = '#fecaca',
    backgroundColor = 'transparent',
    waveSpeedX = 0.0125,
    waveSpeedY = 0.005,
    waveAmpX = 32,
    waveAmpY = 16,
    xGap = 10,
    yGap = 32,
    friction = 0.925,
    tension = 0.005,
    maxCursorMove = 100,
    style = {},
    className = '',
    children,
}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
    const boundingRef = useRef<DOMRect>({ width: 0, height: 0, left: 0, top: 0 } as DOMRect)
    const noiseRef = useRef<Noise>(new Noise(Math.random()))
    const linesRef = useRef<Point[][]>([])
    const mouseRef = useRef<Mouse>({
        x: -10,
        y: 0,
        lx: 0,
        ly: 0,
        sx: 0,
        sy: 0,
        v: 0,
        vs: 0,
        a: 0,
        set: false,
    })

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        ctxRef.current = canvas.getContext('2d')
        if (!ctxRef.current) return

        const setSize = () => {
            if (!container || !canvas) return
            boundingRef.current = container.getBoundingClientRect()
            canvas.width = boundingRef.current.width
            canvas.height = boundingRef.current.height
        }

        const setLines = () => {
            const { width, height } = boundingRef.current
            linesRef.current = []
            const oWidth = width + 200
            const oHeight = height + 30
            const totalLines = Math.ceil(oWidth / xGap)
            const totalPoints = Math.ceil(oHeight / yGap)
            const xStart = (width - xGap * totalLines) / 2
            const yStart = (height - yGap * totalPoints) / 2

            for (let i = 0; i <= totalLines; i++) {
                const pts: Point[] = []
                for (let j = 0; j <= totalPoints; j++) {
                    pts.push({
                        x: xStart + xGap * i,
                        y: yStart + yGap * j,
                        wave: { x: 0, y: 0 },
                        cursor: { x: 0, y: 0, vx: 0, vy: 0 },
                    })
                }
                linesRef.current.push(pts)
            }
        }

        const movePoints = (time: number) => {
            const lines = linesRef.current
            const mouse = mouseRef.current
            const noise = noiseRef.current

            lines.forEach((pts) => {
                pts.forEach((p) => {
                    const move = noise.perlin2((p.x + time * waveSpeedX) * 0.002, (p.y + time * waveSpeedY) * 0.0015) * 12

                    p.wave.x = Math.cos(move) * waveAmpX
                    p.wave.y = Math.sin(move) * waveAmpY

                    const dx = p.x - mouse.sx
                    const dy = p.y - mouse.sy
                    const dist = Math.hypot(dx, dy)
                    const l = Math.max(175, mouse.vs)

                    if (dist < l) {
                        const s = 1 - dist / l
                        const f = Math.cos(dist * 0.001) * s
                        p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065
                        p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065
                    }

                    p.cursor.vx += (0 - p.cursor.x) * tension
                    p.cursor.vy += (0 - p.cursor.y) * tension
                    p.cursor.vx *= friction
                    p.cursor.vy *= friction
                    p.cursor.x += p.cursor.vx * 2
                    p.cursor.y += p.cursor.vy * 2

                    p.cursor.x = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.x))
                    p.cursor.y = Math.min(maxCursorMove, Math.max(-maxCursorMove, p.cursor.y))
                })
            })
        }

        const moved = (point: Point, withCursor = true) => {
            const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0)
            const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0)
            return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }
        }

        const drawLines = () => {
            if (!ctxRef.current) return
            const { width, height } = boundingRef.current
            const ctx = ctxRef.current

            ctx.clearRect(0, 0, width, height)
            ctx.beginPath()
            ctx.strokeStyle = lineColor

            linesRef.current.forEach((points) => {
                let p1 = moved(points[0], false)
                ctx.moveTo(p1.x, p1.y)

                points.forEach((p, idx) => {
                    const isLast = idx === points.length - 1
                    p1 = moved(p, !isLast)
                    const p2 = moved(points[idx + 1] || points[points.length - 1], !isLast)
                    ctx.lineTo(p1.x, p1.y)
                    if (isLast) ctx.moveTo(p2.x, p2.y)
                })
            })
            ctx.stroke()
        }

        const tick = (t: number) => {
            const mouse = mouseRef.current

            mouse.sx += (mouse.x - mouse.sx) * 0.1
            mouse.sy += (mouse.y - mouse.sy) * 0.1

            const dx = mouse.x - mouse.lx
            const dy = mouse.y - mouse.ly
            const d = Math.hypot(dx, dy)
            mouse.v = d
            mouse.vs += (d - mouse.vs) * 0.1
            mouse.vs = Math.min(100, mouse.vs)
            mouse.lx = mouse.x
            mouse.ly = mouse.y
            mouse.a = Math.atan2(dy, dx)

            container.style.setProperty('--x', `${mouse.sx}px`)
            container.style.setProperty('--y', `${mouse.sy}px`)

            movePoints(t)
            drawLines()
            requestAnimationFrame(tick)
        }

        const updateMouse = (x: number, y: number) => {
            const mouse = mouseRef.current
            const b = boundingRef.current
            mouse.x = x - b.left
            mouse.y = y - b.top + window.scrollY

            if (!mouse.set) {
                mouse.sx = mouse.x
                mouse.sy = mouse.y
                mouse.lx = mouse.x
                mouse.ly = mouse.y
                mouse.set = true
            }
        }

        setSize()
        setLines()

        requestAnimationFrame(tick)
        const onResize = () => {
            setSize()
            setLines()
        }

        window.addEventListener('resize', onResize)
        const onMouseMove = (e: MouseEvent) => {
            updateMouse(e.clientX, e.clientY)
        }
        window.addEventListener('mousemove', onMouseMove)
        const onTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                updateMouse(e.touches[0].clientX, e.touches[0].clientY)
            }
        }
        window.addEventListener('touchmove', onTouchMove, { passive: false })

        return () => {
            window.removeEventListener('resize', onResize)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('touchmove', onTouchMove)
        }
    }, [lineColor, backgroundColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap])

    return (
        <div
            ref={containerRef}
            style={{
                backgroundColor,
                ...style,
            }}
            className={`absolute top-0 left-0 w-full h-full overflow-hidden ${className}`}>
            <div
                className='absolute top-0 left-0 bg-[#160000] rounded-full w-[0.5rem] h-[0.5rem]'
                style={{
                    transform: 'translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)',
                    willChange: 'transform',
                }}
            />
            <canvas ref={canvasRef} className='block w-full h-full z-50 pointer-events-auto' />
            {children}
        </div>
    )
}

export default Waves
