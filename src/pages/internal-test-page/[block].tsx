import { MOCK_INTERNAL_TEST_PAGE } from "@/src/common/mocks/internal-test-page-mock/internal-test-page-mock";
import { BlockRenderer } from "@/src/components/globals/BlockRenderer/BlockRenderer";

export default function InternalTestPage({
  block,
}: {
  block: any;
}) {
  return (
    <BlockRenderer
      block={block}
      slug=""
      email=""
    />
  );
}

export async function getServerSideProps({
  query,
}: {
  query: {
    block: string;
  };
}) {
  const testBlock = MOCK_INTERNAL_TEST_PAGE.blocks
    .find((block) => block.__component === query.block);

  if (!testBlock) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      block: testBlock || null,
    },
  };
}
