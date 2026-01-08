import { PassportPossessionForm } from '@/components/forms/PassportPossessionForm'
import { fetchCustmersForSelect } from '@/lib/api/customer'
import { fetchPassportPossessionById } from '@/lib/api/passport-possession'

async function Page({ params }: { params: { id: string } }) {
  const { id } = await params
  const customers = await fetchCustmersForSelect()
  const passportPossession = await fetchPassportPossessionById(id)
  return (
    <>
      <PassportPossessionForm customers={customers} id={id} data={passportPossession?.data || null} />
    </>
  )
}

export default Page