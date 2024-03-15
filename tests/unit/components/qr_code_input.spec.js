import { shallowMount } from '@vue/test-utils'
import QRCodeInput from '@/components/QRCodeInput.vue'
import { createStore } from 'vuex'

describe('QRCodeInput', () => {
  describe('mounting a component', () => {
    it('should render qr code input component', () => {
      const wrapper = shallowMount(QRCodeInput)
      const component = wrapper.find('.hello')
      expect(component.classes()).toContain('hello')
    })
  })

  describe('renders qr code input component with dependencies', () => {
    const store = createStore({
      state () {
        return { count: 1 }
      }
    })

    const wrapper = shallowMount(QRCodeInput, {
      global: {
        plugins: [store]
      }
    })
    it('renders generate qr code button with text', () => {
      const component = wrapper.find('#btn-generate')

      expect(component.text()).toBe('Generar QR')
    })
    it('renders text input, change its value and see if stored ', () => {
      const component = wrapper.find('#txt-qr-code')
      expect(component.element.value).toBe('')
      component.setValue('www.google.com')
      expect(wrapper.vm.qrCodeInput).toBe('www.google.com')
    })
  })
  describe('actions and mocks', () => {
    describe('triggers click in qr code button and the event is called', () => {
      const spySendQRCode = jest.spyOn(QRCodeInput.methods, 'sendQRCode')
      const wrapper = shallowMount(QRCodeInput)
      const txtComponent = wrapper.find('#txt-qr-code')
      const qrCode = 'www.test.com'
      txtComponent.setValue(qrCode)
      it('sendQRCode has been called', async () => {
        const btnComponent = wrapper.find('#btn-generate')
        await btnComponent.trigger('click')
        expect(spySendQRCode).toHaveBeenCalledTimes(1)
        expect(wrapper.emitted()).toHaveProperty('qrCodeInput')
        expect(wrapper.emitted('qrCodeInput')).toHaveLength(1)
        expect(wrapper.emitted('qrCodeInput')[0]).toStrictEqual([qrCode])
      })
      it('button should disabled for default', async () => {
        const wrapper = shallowMount(QRCodeInput)
        const btnComponent = wrapper.find('#btn-generate')
        expect(btnComponent.attributes().disabled).toBeDefined()
      })
    })
  })
})
