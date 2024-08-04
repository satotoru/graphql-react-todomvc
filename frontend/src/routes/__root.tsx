import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Flex, Link as ChakraLink, Text, Box } from '@chakra-ui/react'


function Header() {
  return (
    <Flex p={2} gap={2} as={'header'}>
      <ChakraLink as={Link} to="/" fontWeight="bold">
        Home
      </ChakraLink>
    </Flex>
  )
}

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <hr />
      <Box margin={5}>
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </>
  ),
})
