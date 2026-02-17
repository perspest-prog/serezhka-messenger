import Component, { type Props } from '../../core/Component';
import template from './template.hbs';
import classes from './styles.module.css';

import type Input from '../Input';
import type Button from '../Button';
import { userController } from '../../settings';
import connect from '../../hocs/connect';

interface ModalProps extends Props {
  title: string
  input: Input
  button: Button
  openModal: boolean
}

class Modal extends Component<ModalProps> {
  constructor(props: ModalProps ) {
    super({ ...props, classes })
  }
  protected render(): Handlebars.TemplateDelegate {
    return template
  }
  protected componentDidMount(): void {
    this.events.click = this.closeModal.bind(this)
    this.children.button.events.click = this.handlerButton.bind(this)
  }

  private closeModal(event: Event) {
    if (this.state.openModal && this.getContent() === event.target) {
      this.state.openModal = !this.state.openModal
    }
  }
  private handlerButton() {
    if (this.state.openModal) {
      const data = new FormData
      data.append(this.children.input.state.name, this.children.input.getContent()?.querySelector('input')?.files[0])
      userController.editAvatar(data)
    }
  }

}

export default connect(Modal, () => {
  return {openModal: false,}
})
