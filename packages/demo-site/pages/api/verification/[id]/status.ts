import type { VerificationInfoResponse } from "@centre/verity"
import { apiHandler } from "../../../../lib/api-fns"
import { fetchVerificationOfferStatus } from "../../../../lib/database/verificationRequests"
import { NotFoundError } from "../../../../lib/errors"

type Resp = {
  result: VerificationInfoResponse
  status: string
}

export default apiHandler<Resp>(async (req, res) => {
  const verificationRequest = await fetchVerificationOfferStatus(
    req.query.id as string
  )

  if (!verificationRequest) {
    throw new NotFoundError()
  }

  const status = verificationRequest.status
  const result = verificationRequest.result

  res.json({ result, status })
})
