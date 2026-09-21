import { useState } from "react"
import { Button, Modal } from "@heroui/react"
import { site } from "../config/site"

const STORAGE_KEY = "age-confirmed"

function alreadyConfirmed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

/** Aviso +18 al entrar. Se recuerda en el navegador; se desactiva con `ageGate: false`. */
export function AgeGate() {
  const [isOpen, setIsOpen] = useState(() => !alreadyConfirmed())

  const confirm = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1")
    } catch {
      // Navegación privada: se volverá a preguntar la próxima vez.
    }
    setIsOpen(false)
  }

  const leave = () => {
    window.location.href = "https://www.google.com"
  }

  return (
    <Modal.Backdrop
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isDismissable={false}
      isKeyboardDismissDisabled
      className="bg-canvas/40 backdrop-blur-2xl"
    >
      <Modal.Container placement="center" size="sm" scroll="outside">
        <Modal.Dialog
          aria-labelledby="age-title"
          aria-describedby="age-text"
          className="glass-strong items-center rounded-[36px] p-7 text-center sm:p-8"
        >
          <Modal.Header className="items-center gap-4">
            <span className="grid size-20 place-items-center rounded-[26px] bg-gradient-brand text-3xl font-black tracking-tight text-white shadow-glow">
              18+
            </span>
            <Modal.Heading id="age-title" className="text-[28px] leading-tight font-black tracking-[-0.03em] text-ink">
              Contenido para adultos
            </Modal.Heading>
          </Modal.Header>
          <Modal.Body id="age-text" className="text-[15px] leading-relaxed font-medium text-ink-soft">
            {site.name} es un sitio dirigido exclusivamente a mayores de 18 años. Al continuar confirmas que tienes la
            edad legal en tu país.
          </Modal.Body>
          <Modal.Footer className="w-full flex-col-reverse gap-2 sm:flex-row">
            <Button variant="tertiary" size="lg" fullWidth onPress={leave} className="rounded-full bg-white/70 font-extrabold text-ink ring-1 ring-ink/10">
              Salir
            </Button>
            <Button size="lg" fullWidth onPress={confirm} className="rounded-full bg-gradient-brand font-extrabold text-white shadow-glow">
              Soy mayor de 18
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}
