export interface SplashCursorProps {
    SIM_RESOLUTION?: number
    DYE_RESOLUTION?: number
    CAPTURE_RESOLUTION?: number
    DENSITY_DISSIPATION?: number
    VELOCITY_DISSIPATION?: number
    PRESSURE?: number
    PRESSURE_ITERATIONS?: number
    CURL?: number
    SPLAT_RADIUS?: number
    SPLAT_FORCE?: number
    SHADING?: boolean
    COLOR_UPDATE_SPEED?: number
    BACK_COLOR?: { r: number; g: number; b: number }
    TRANSPARENT?: boolean
}

export interface PointerPrototype {
    id: number
    texcoordX: number
    texcoordY: number
    prevTexcoordX: number
    prevTexcoordY: number
    deltaX: number
    deltaY: number
    down: boolean
    moved: boolean
    color: { r: number; g: number; b: number }
}

export interface Config {
    SIM_RESOLUTION: number
    DYE_RESOLUTION: number
    CAPTURE_RESOLUTION: number
    DENSITY_DISSIPATION: number
    VELOCITY_DISSIPATION: number
    PRESSURE: number
    PRESSURE_ITERATIONS: number
    CURL: number
    SPLAT_RADIUS: number
    SPLAT_FORCE: number
    SHADING: boolean
    COLOR_UPDATE_SPEED: number
    PAUSED: boolean
    BACK_COLOR: { r: number; g: number; b: number }
    TRANSPARENT: boolean
    COLORFUL: boolean
    BLOOM: boolean
    SUNRAYS: boolean
    BLOOM_THRESHOLD: number

    BLOOM_SOFT_KNEE: number

    BLOOM_INTENSITY: number

    SUNRAYS_WEIGHT: number
}

export interface Material {
    vertexShader: WebGLShader
    fragmentShaderSource: string
    programs: WebGLProgram[]
    activeProgram: WebGLProgram | null
    uniforms: { [key: string]: WebGLUniformLocation }
}

export interface Program {
    uniforms: { [key: string]: WebGLUniformLocation }
    program: WebGLProgram
}

export interface FBO {
    texture: WebGLTexture
    fbo: WebGLFramebuffer
    width: number
    height: number
    texelSizeX: number
    texelSizeY: number
    attach: (id: number) => number
}

export interface DoubleFBO {
    width: number
    height: number
    texelSizeX: number
    texelSizeY: number
    read: FBO
    write: FBO
    swap: () => void
}
