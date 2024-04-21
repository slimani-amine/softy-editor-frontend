import ModalExample from '@src/modules/dashboard/components/ModalExample'
import { useAppDispatch, useAppSelector } from '../store'
import { closeModal } from '../store/slices/modals/modalsSlice'

// import EditTaskPopup from '@src/modules/tasks/components/EditTaskPopup'

const ModalIsOpen = (id: string, modals: any) => {
  const modal = modals[id]
  return modal?.open
}

function ModalsProvider() {
  const dispatch = useAppDispatch()
  const modals = useAppSelector((state) => state.modals)
  const modalState = (id: string, key: 'open' | 'data') => {
    const res = modals[id]
    return res && res[key] ? res[key] : null
  }
  const handleClose = (id: string) => dispatch(closeModal({ id }))

  return (
    <>
      {ModalIsOpen('example-modal', modals) && (
        <ModalExample
          id="example-modal"
          open={modalState('example-modal', 'open')}
          data={modalState('example-modal', 'data')}
          handleClose={handleClose}
        />
      )}
    </>
  )
}

export default ModalsProvider
