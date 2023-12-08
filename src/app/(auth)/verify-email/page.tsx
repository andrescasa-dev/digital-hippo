interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

function verifyEmailPage({searchParams} : PageProps) {
  return (
    <div>
      <div>Token</div>
      <div>{searchParams.token}</div>
    </div>
  )
}

export default verifyEmailPage