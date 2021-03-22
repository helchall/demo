<?php

namespace App\Repository;

use App\Entity\Articlee;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Articlee|null find($id, $lockMode = null, $lockVersion = null)
 * @method Articlee|null findOneBy(array $criteria, array $orderBy = null)
 * @method Articlee[]    findAll()
 * @method Articlee[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Articlee::class);
    }

    // /**
    //  * @return Articlee[] Returns an array of Articlee objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Articlee
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
