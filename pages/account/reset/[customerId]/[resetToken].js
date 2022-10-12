import ResetPasswordForm from "@/components/Layout/Forms/ResetPasswordForm"

const ResetPassword = ({customerId, resetToken}) => {

  return (
    <div className="account-form-page">
      <div className="account-form-page__form">
        <ResetPasswordForm customerId={customerId} resetToken={resetToken}  />
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {

  const { customerId, resetToken } = params

  return {
    props: {
      customerId,
      resetToken
    }
  }
}


export default ResetPassword