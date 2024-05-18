import { Button, HStack, IconButton } from '@chakra-ui/react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

interface PaginationProps {
  onNext(): void
  onPrevious(): void
  currentPage: number
  isLastPage: boolean
  isFullWidht?: boolean
  isHidden?: boolean
}

export function Pagination({
  onNext,
  onPrevious,
  currentPage,
  isLastPage,
  isFullWidht = true,
  isHidden = false,
}: PaginationProps) {
  if (isHidden) return <></>

  if (!isFullWidht) {
    return (
      <HStack spacing="2">
        <IconButton
          aria-label="Go back one page"
          icon={<MdChevronLeft />}
          onClick={onPrevious}
          isDisabled={currentPage <= 1}
        />
        <Button>{currentPage}</Button>
        <IconButton
          aria-label="Go back one page"
          icon={<MdChevronRight />}
          onClick={onNext}
          isDisabled={isLastPage}
        />
      </HStack>
    )
  }

  return (
    <HStack
      spacing="2"
      display="flex"
      w="full"
      flexDir="row"
      justifyContent="flex-end"
      pt={2}
    >
      <IconButton
        aria-label="Go back one page"
        icon={<MdChevronLeft />}
        onClick={onPrevious}
        isDisabled={currentPage <= 1}
      />
      <Button>{currentPage}</Button>
      <IconButton
        aria-label="Go back one page"
        icon={<MdChevronRight />}
        onClick={onNext}
        isDisabled={isLastPage}
      />
    </HStack>
  )
}
