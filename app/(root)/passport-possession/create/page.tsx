import { PassportPossessionForm } from '@/components/forms/PassportPossessionForm'
import { fetchCustmersForSelect } from '@/lib/api/customer'

async function page() {

  const customers = await fetchCustmersForSelect()
  return (
    <>
      <PassportPossessionForm customers={customers} />
    </>
  )
}

export default page