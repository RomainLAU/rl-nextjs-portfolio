import { useForm, ValidationError } from '@formspree/react'
import { motion } from 'framer-motion'

export default function ContactForm() {
    const [state, handleSubmit] = useForm('xeqnklnr')

    return (
        <motion.form
            animate={{ height: state.succeeded ? 0 : 'fit-content' }}
            transition={{ duration: 0.6, ease: 'easeIn' }}
            onSubmit={handleSubmit}
            className='flex flex-col gap-y-8 overflow-hidden'>
            <label htmlFor='email'>Email Address</label>
            <input className='bg-black border border-white rounded-lg px-8 py-4 text-white' id='email' type='email' name='email' placeholder='Your mail' />
            <ValidationError prefix='Email' field='email' errors={state.errors} />
            <textarea className='bg-black border border-white rounded-lg px-8 py-4 text-white' id='message' name='message' placeholder='Your message' />
            <ValidationError prefix='Message' field='message' errors={state.errors} />
            {/* <SubmitButton state={state} /> */}
        </motion.form>
    )
}
