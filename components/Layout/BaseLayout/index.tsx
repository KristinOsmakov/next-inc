import { NextPage } from "next";
import { PropsWithChildren, ReactElement } from "react";
import { Layout } from "..";

export const BaseLayout: NextPage<PropsWithChildren> = (props) => {
    const { children } = props;
    return (
        <Layout>{children}</Layout>
    )
}
export function getLayout(page: ReactElement) {
        return (
            <BaseLayout>{page}</BaseLayout>
        )
}