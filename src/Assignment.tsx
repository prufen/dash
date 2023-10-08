import { useLoaderData } from "react-router-dom";

export async function loadAssignment(repoPrefix: string) {
  return repoPrefix
}

export default function Assignment() {
  // TODO: workarounding lack of typing here:
  // https://github.com/remix-run/react-router/discussions/9792
  const data = useLoaderData() as Awaited<ReturnType<typeof loadAssignment>>;
  console.log('data:', data)
  return (
    <div>
      Data: {data}
    </div>
  )
}
